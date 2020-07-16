export interface IFileUploadProps {
  handleAttachedFile: (files: File[]) => void;
  handleDeleteAttachedFile: (file: File) => void;
  files: File[];
}
