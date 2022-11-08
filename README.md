### Example how to use
```JS

const onUploadChunk = (params: onUploadChunksParams) => {
    const formData = new FormData();
    formData.append('file', params.chunk, params.fileName);
    // send POST request to server
    // send payload: 
    // { id: params.id, fileName: params.fileName}
}

const onUploadCompleted = async (params: onUploadCompletedParams) => {
    // send post request to server
    // send payload:
    // { fileName: params.fileName, originFileName: params.originFileName}
    const data = await post(...);
    //dispatch(ACTION());
    return data;
}

const fileUploaderHook = useFileUploader({ onUploadChunk, onUploadCompleted, chunkSize });

// Start upload:
fileUploaderHook.handleFile(files[0])
// Get progress
fileUploaderHook.progress

```