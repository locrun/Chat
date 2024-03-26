import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import s from '../content.module.scss';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';

interface FileItemProps {
  file: string;
  iconSize?: SizeProp;
  className?: string;
}

export const FileItem: FC<FileItemProps> = ({
  file,
  iconSize = '2x',
  className
}) => {
  const fileName = file.substring(file.lastIndexOf('/') + 1);
  if (file.endsWith('.png') || file.endsWith('.jpg')) {
    return (
      <img
        className={classNames(s.fileItemImage, className)}
        src={file}
        alt="picture"
      />
    );
  } else {
    return (
      <a
        className={classNames(s.fileItem, className)}
        href={file}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon="file" size={iconSize} color="rgb(182 193 210)" />
        {fileName}
      </a>
    );
  }
};
