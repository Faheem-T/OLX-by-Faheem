import { useEffect, useState } from "react";
import { Header } from "./Header";
import { supabase } from "./utils/supabaseClient";
import { ProductCard } from "./ProductCard";
import { SubHeader } from "./SubHeader";
import { ProductCategory } from "./ProductCategory";
import Uppy from "@uppy/core";
import { DashboardModal } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import Tus from "@uppy/tus";

const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SUPABASE_PROJECT_ID = "ssgvoeghescpzolyfark";
const STORAGE_BUCKET = "ProductImages";

const folder = "";
const supabaseStorageURL = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/upload/resumable`;

function App() {
  const [uploadedURLs, setUploadedUrls] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [uppy] = useState(() =>
    new Uppy({ restrictions: { allowedFileTypes: ["image/*"] } })
      .on("file-added", (file) => {
        const supabaseMetadata = {
          bucketName: STORAGE_BUCKET,
          objectName: folder ? `${folder}/${file.name}` : file.name,
          contentType: file.type,
        };

        file.meta = {
          ...file.meta,
          ...supabaseMetadata,
        };

        console.log("file added", file);
      })
      .on("upload-success", (file, response) => {
        console.log("Upload successful:", file.name);
        console.log("Response:", response);
        setUploadedFiles((prev) => [...prev, file.name]);
        setUploadedUrls((prev) => [
          ...prev,
          // getting public URL from supabase storage
          supabase.storage.from("ProductImages").getPublicUrl(`${file.name}`)
            .data.publicUrl,
        ]);
      })
      .on("complete", (result) => {
        uppy.getPlugin("dashboard").closeModal();
        console.log(
          "Upload complete! We’ve uploaded these files:",
          result.successful
        );
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
        ],
        onError: function (error) {
          console.log("Failed because: " + error);
        },
      })
  );

  useEffect(() => {
    return () => uppy.clear();
  }, [uppy]);

  return (
    <>
      <Header />
      <SubHeader />
      <ProductCategory />
      <div>
        {uploadedFiles.map((url) => (
          <div key={url}>{url}</div>
        ))}
      </div>
      <button id="uppy-button">UPPY</button>
      <div>
        {uploadedURLs.map((url) => (
          <div key={url}>{url}</div>
        ))}
      </div>

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

export default App;
