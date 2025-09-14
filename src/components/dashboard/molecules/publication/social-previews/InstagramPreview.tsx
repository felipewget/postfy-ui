import { Avatar } from '@mantine/core';
import React from 'react';
import styles from './SocialPreview.module.css';

type Props = {
  author: string;
  text: string;
  image?: string;
  date?: string;
};

export default function InstagramPreview({ author, text, image, date }: Props) {
  return (
    <div className={styles.previewCard} style={{ backgroundColor: '#fff0f6' }}>
      <div className={styles.header}>
        <Avatar color="pink" radius="xl">{author[0]}</Avatar>
        <div>
          <div className={styles.author}>{author}</div>
          <div className={styles.date}>{date ?? 'Agora'}</div>
        </div>
      </div>
      {image && <img src={image} alt="preview" className={styles.image} />}
      <div className={styles.text}>{text}</div>
      <div className={styles.footer}>❤️ Curtidas · 💬 Comentários</div>
    </div>
  );
}