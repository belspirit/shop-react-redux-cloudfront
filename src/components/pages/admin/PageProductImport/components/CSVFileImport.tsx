import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React, { useState } from "react";

const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(3, 0, 3),
  },
}));

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const classes = useStyles();
  const [file, setFile] = useState<any>();

  const onFileChange = (e: any) => {
    console.log(e);
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    setFile(files.item(0));
  };

  const removeFile = () => {
    setFile("");
  };

  const uploadFile = async (e: any) => {
    const authorization_token = localStorage.getItem("authorization_token");
    // Get the presigned URL
    const response = await axios({
      method: "GET",
      url,
      params: {
        name: encodeURIComponent(file.name),
      },
      headers: { Authorization: `Basic ${authorization_token}` },
    });
    console.log("File to upload: ", file.name);
    const signedUrl = response.data.signedUrl;
    console.log("Uploading to: ", signedUrl);
    const result = await fetch(signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "text/csv",
      },
      body: file,
    });
    console.log("Result: ", result);
    setFile("");
  };
  return (
    <div className={classes.content}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </div>
  );
}
