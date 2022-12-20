### Example how to use
```jsx


const requestOptions = (body, contentType = null) => {
    const headers = {
        Authorization: 'Bearer <TOKEN>',
    };
    if (contentType) {
        headers['Content-Type'] = contentType;
    }
    return {
        method: 'POST',
        headers,
        body,
    };
};

const onUploadChunk = (params) => {
    const formData = new FormData();
    formData.append('file', params.chunk, params.fileName);

    return fetch(
        `<ENDPOINT TO UPLOAD A CHUNK>`,
        requestOptions(formData),
    );
};

const onUploadCompleted = async (params) => {
    const data = await fetch(
        `<ENDPOINT TO COMPLETE UPLOADING>`,
        requestOptions(
            JSON.stringify({ fileName: params.fileName, originFileName: params.originFileName }),
            'application/json',
        ),
    );

    const responseData = await data.json(); // {id, path}

    if (responseData.id) {
        await fetch(
            `<ENDPOINT IF YOU NEED TO ASSIGN AN UPLOADED FILE TO SOME ENTITY>`,
            requestOptions(
                JSON.stringify({ productViewId: 1, mediaResourceId: responseData.id }),
                'application/json',
            ),
        );
    }

    //You can move onUploadCompleted function inside you component and run some hooks after compliting. 
    // Depends on response
    //console.log('path', responseData.path);
    return data;
};

const FileUploaderComponent = () => {
    const fileUploaderHook = useFileUploader({ onUploadChunk, onUploadCompleted });

    const onChange = useCallback((e) => {
        fileUploaderHook.handleFile(e.target.files[0]);
    }, []);

    return (
        <div>
            <input type="file" onChange={onChange} />
            <div>{fileUploaderHook.fileToBeUpload?.size}</div>
            <div>{fileUploaderHook.progress}</div>
        </div>
    );
}


```