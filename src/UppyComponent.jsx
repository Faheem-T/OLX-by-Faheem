import { useEffect, useState } from "react";
import { supabase } from "./utils/supabaseClient";
import Uppy from "@uppy/core";
import { DashboardModal } from "@uppy/react";
import Tus from "@uppy/tus";
import { v4 as uuidv4 } from "uuid";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SUPABASE_PROJECT_ID = "ssgvoeghescpzolyfark";
const STORAGE_BUCKET = "ProductImages";

const folder = "";
const supabaseStorageURL = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/upload/resumable`;

export function UppyComponent({ setImgUrls }) {
  const [uppy] = useState(() =>
    new Uppy({ restrictions: { allowedFileTypes: ["image/*"] } })
      .on("file-added", (file) => {
        // Generate a UUID for the filename with the original extension
        const fileExt = file.name.split(".").pop();
        const newFileName = `${uuidv4()}.${fileExt}`;
        file.name = newFileName;

        const filePath = folder ? `${folder}/${newFileName}` : newFileName;

        const supabaseMetadata = {
          bucketName: STORAGE_BUCKET,
          objectName: filePath,
          contentType: file.type,
        };

        file.meta = {
          ...file.meta,
          ...supabaseMetadata,
          filePath,
        };

        console.log("File prepared for upload:", {
          name: file.name,
          path: filePath,
          type: file.type,
        });
      })
      .on("upload-success", async (file, response) => {
        try {
          // Generate the public URL directly after successful upload
          const { data } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(file.meta.filePath || file.name);

          if (data?.publicUrl) {
            console.log("Generated public URL:", data.publicUrl);
            setImgUrls((prev) => [...prev, data.publicUrl]);
          } else {
            console.error("Failed to generate public URL for:", file.name);
          }
        } catch (error) {
          console.error("Error generating public URL:", error);
        }
      })
      .on("complete", (result) => {
        if (uppy.getPlugin("dashboard")) {
          uppy.getPlugin("dashboard").closeModal();
        }
        console.log("Upload complete! Files uploaded:", result.successful);
      })
      .on("error", (error) => {
        console.error("Uppy error:", error);
      })
      .use(Tus, {
        endpoint: supabaseStorageURL,
        headers: {
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          apikey: SUPABASE_ANON_KEY,
        },
        uploadDataDuringCreation: true,
        chunkSize: 6 * 1024 * 1024,
        allowedMetaFields: [
          "bucketName",
          "objectName",
          "contentType",
          "cacheControl",
          "filePath",
        ],
        onError: function (error) {
          console.error("Tus upload failed:", error);
        },
      })
  );

  useEffect(() => {
    return () => uppy.clear();
  }, [uppy]);

  return (
    <>
      <button
        id="uppy-button"
        className="bg-primary text-white font-bold rounded-lg px-4 py-2"
        type="button"
        onClick={(e) => {
          e.preventDefault;
        }}
      >
        UPLOAD IMAGES
      </button>
      <DashboardModal
        uppy={uppy}
        plugins={["Dashboard"]}
        open={false}
        trigger="#uppy-button"
        id="dashboard"
      />
    </>
  );
}
