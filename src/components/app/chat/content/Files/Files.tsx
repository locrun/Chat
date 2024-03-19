import React, { FC } from 'react';
import s from '..//content.module.scss';
import classNames from 'classnames';
import { FileItem } from './FileItem';

interface FilesItems {
  id: number;
  file: string;
}

interface Props {
  files: FilesItems[];
  isMy: boolean;
}

export const Files: FC<Props> = ({ files, isMy }) => {
  const images: FilesItems[] = [];
  const filesList: FilesItems[] = [];

  files.forEach(item => {
    if (item.file.endsWith('.png') || item.file.endsWith('.jpg')) {
      return images.push(item);
    } else {
      return filesList.push(item);
    }
  });

  return (
    <div>
      {images.length > 0 && (
        <div className={classNames(s.images, { [s.myFiles]: isMy })}>
          {images.map(image => (
            <FileItem key={image.id} file={image.file} />
          ))}
        </div>
      )}

      {filesList.length > 0 && (
        <div className={classNames(s.filesWrapper, { [s.myFiles]: isMy })}>
          <div
            className={classNames(s.message, s.filesList, {
              [s.isMy]: isMy,
              [s.another]: !isMy
            })}
          >
            {filesList.map(image => (
              <FileItem key={image.id} file={image.file} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
