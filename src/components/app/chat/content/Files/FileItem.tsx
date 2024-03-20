import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import s from '../content.module.scss';

interface FileItemProps {
  file: string;
}

export const FileItem: FC<FileItemProps> = ({ file }) => {
  const fileName = file.substring(file.lastIndexOf('/') + 1);
  if (file.endsWith('.png') || file.endsWith('.jpg')) {
    return <img className={s.fileItemImage} src={file} alt="picture" />;
  } else {
    return (
      <a
        className={s.fileItem}
        href={file}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon="file" size="2x" color="rgb(182 193 210)" />
        {fileName}
      </a>
    );
  }
};
