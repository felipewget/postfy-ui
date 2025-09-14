import { Avatar } from '@mantine/core';
import React from 'react';
import styles from './SocialPreview.module.css';

type Props = {
  author: string;
  text: string;
  image?: string;
  date?: string;
};

export default function LinkedInPreview({ author, text, image, date }: Props) {
  return (
    <div className={styles.previewCard} style={{ backgroundColor: '#f3f6f8' }}>
      <div className={styles.header}>
        <Avatar color="blue" radius="xl">{author[0]}</Avatar>
        <div>
          <div className={styles.author}>{author}</div>
          <div className={styles.date}>{date ?? 'Agora'}</div>
        </div>
      </div>
      <div className={styles.text}>{text}</div>
      {image && <img src={image} alt="preview" className={styles.image} />}
      <div className={styles.footer}>👍 Curtidas · 💬 Comentários · 🔁 Compartilhamentos</div>
    </div>
  );
}