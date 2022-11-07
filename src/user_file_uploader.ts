import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MAX_CHUNK_SIZE } from './consts';
import { FileUploaderState, userFileUploaderProps } from './types';

const initialState = {
  showProgress: false,
  counter: 1,
  fileToBeUpload: null,
  beginingOfTheChunk: 0,
  endOfTheChunk: MAX_CHUNK_SIZE,
  progress: 0,
  fileGuid: '',
  originFileName: '',
  fileSize: 0,
  chunkCount: 0,
};

export const useFileUploader = ({
  onUploadChunk,
  onUploadCompleted,
  chunkSize = MAX_CHUNK_SIZE,
}: userFileUploaderProps) => {
  const [state, setState] = useState<FileUploaderState>(initialState);
  const {
    counter,
    fileToBeUpload,
    beginingOfTheChunk,
    endOfTheChunk,
    progress,
    fileGuid,
    originFileName,
    fileSize,
    chunkCount,
  } = state;

  const handleFile = useCallback(
    (_file: File) => {
      const _totalCount =
        _file.size % chunkSize == 0
          ? _file.size / chunkSize
          : Math.floor(_file.size / chunkSize) + 1;
      const _fileID = uuidv4() + '.' + _file.name.split('.').pop();

      setState({
        ...initialState,
        progress: 0,
        fileSize: _file.size,
        chunkCount: _totalCount,
        fileGuid: _fileID,
        originFileName: _file.name,
        fileToBeUpload: _file,
      });
    },
    [chunkSize],
  );
  const fileUpload = () => {
    if (fileToBeUpload && counter <= chunkCount) {
      const chunk = fileToBeUpload.slice(beginingOfTheChunk, endOfTheChunk);
      uploadChunk(chunk);
    }
  };

  const uploadChunk = useCallback(
    async (chunk: Blob) => {
      try {
        /*const response =*/ await onUploadChunk({
          id: counter,
          fileName: fileGuid,
          chunk,
        });

        //const data = response.data;
        let progress;
        if (counter == chunkCount) {
          await uploadCompleted({ fileGuid, originFileName });
          progress = 100;
        } else {
          progress = (counter / chunkCount) * 100;
        }
        setState({
          ...state,
          beginingOfTheChunk: endOfTheChunk,
          endOfTheChunk: endOfTheChunk + chunkSize,
          progress,
          counter: counter + 1,
        });
      } catch (error) {
        console.log('error', error);
      }
    },
    [
      onUploadChunk,
      state,
      setState,
      chunkCount,
      fileGuid,
      originFileName,
      counter,
      chunkSize,
      beginingOfTheChunk,
      endOfTheChunk,
    ],
  );

  const uploadCompleted = useCallback(
    async ({ fileGuid, originFileName }: { fileGuid: string; originFileName: string }) => {
      /*const data =*/ await onUploadCompleted({
        fileName: fileGuid,
        originFileName,
      });
    },
    [onUploadCompleted],
  );

  useEffect(() => {
    if (fileSize > 0 && progress < 100) {
      fileUpload();
    }
  }, [fileToBeUpload, progress]);

  return {
    handleFile,
    fileToBeUpload,
    progress,
    reset() {
      setState(initialState);
    },
  };
};
