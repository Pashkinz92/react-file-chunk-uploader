export type onUploadChunkParams = {
  id: number;
  fileName: string;
  chunk: Blob;
};

export type onUploadCompletedParams = {
  fileName: string;
  originFileName: string;
};

export type UploadChunkResponse = {
  data: {
    isSuccess: true;
  };
};

export type UploadCompletedResponse = {
  id: number;
  path: string;
};

export type FileUploaderState = {
  showProgress: boolean;
  counter: number;
  fileToBeUpload: File | null;
  beginingOfTheChunk: number;
  endOfTheChunk: number;
  progress: number;
  fileGuid: string;
  originFileName: string;
  fileSize: number;
  chunkCount: number;
};

export type OnUploadChunkType = (params: onUploadChunkParams) => Promise<UploadChunkResponse>;
export type OnUploadCompletedType = (
  params: onUploadCompletedParams,
) => Promise<UploadCompletedResponse>;

export type userFileUploaderProps = {
  chunkSize?: number;
  onUploadChunk: OnUploadChunkType;
  onUploadCompleted: OnUploadCompletedType;
};
