import React, { FC } from 'react';
import * as parser from 'bbcode-to-react';
import { Tag } from 'bbcode-to-react';

class FontTag extends Tag {
  toHTML(): string {
    const attributes = {
      text: this.getContent(true),
      font: this.params.FONT
    };
    return `<span style="font-family: ${attributes.font}">${attributes.text}</span>`
  }
}

class UserTag extends Tag {
  toHTML(): string {
    const attributes = {
      userId: this.params['USER']
    };
    const content = this.getContent(true).replace(/\[\/?url]/g, '')
    return `<a target="_blank" href="/dashboard/profile/${attributes.userId}">${content}</a>`
  }
}

parser.registerTag('font', FontTag);
parser.registerTag('user', UserTag);

export const BBCode: FC<{content: string}> = (props) => {
  let { content } = props;
  let htmlContent = parser.toHTML(content);
  htmlContent = htmlContent.replace(/&amp;quot;/g, '"');
  htmlContent = htmlContent.replace(/&amp;lt;/g, '<');
  htmlContent = htmlContent.replace(/&amp;gt;/g, '>');
  htmlContent = htmlContent.replace(/\[DISK[^\]]+]/g, '');
  htmlContent = htmlContent.replace(/\[\/?size]/g, '');

  return (
    <span
      dangerouslySetInnerHTML={{__html: htmlContent}}
    />
  )
}
