import React, { FC } from 'react';
import { v4 as uuid4 } from "uuid";
import * as parser from 'bbcode-to-react';

class FontTag extends parser.Tag {
  toReact() {
    const attributes = {
      text: this.getContent(true),
      font: this.params.FONT
    };
    return <span style={{fontFamily: attributes.font}}>${attributes.text}</span>
  }
}

class UserTag extends parser.Tag {
  toReact() {
    const content = this.getContent()
    return parser.toReact(content)
  }
}

class PTag extends parser.Tag {
  toReact() {
    return <p>{parser.toReact(this.getContent())}</p>
  }
}

class URLTag extends parser.Tag {
  toReact() {
    const attributes = {
      text: this.getContent(),
      url: this.params.URL
    };
    return <a
      href={attributes.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      { parser.toReact(attributes.text) }
    </a>
  }
}

parser.registerTag('font', FontTag);
parser.registerTag('user', UserTag);
parser.registerTag('p', PTag);
parser.registerTag('url', URLTag);

export const BBCode: FC<{content: string}> = (props) => {
  let { content } = props;
  let ReactContents = content
    .replace(
      /&lt;/g,
      '<'
    )
    .replace(
    /&gt;/g,
    '>'
    )
    .replace(
      /\[DISK[^\]]+]|\[\/?size]/g,
      '"'
    )
    .replace(
      /&quot;/g,
      '"'
    )
    .split('\n')
    .map(c => parser.toReact(c));
  return (
    <>{ ReactContents.map(rc => <div key={uuid4()}>{ rc }</div>) }</>
  )
}
