import React, { FC } from 'react';
import { v4 as uuid4 } from "uuid";
import parser from 'bbcode-to-react';

class FontTag extends parser.Tag {
  toReact() {
    const attributes = {
      text: this.getContent(true),
      font: this.params.FONT
    };
    return <span style={{fontFamily: attributes.font}}>{parser.toReact(attributes.text)}</span>
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

class SizeTag extends parser.Tag {
  toReact(): JSX.Element {
    const attributes = {
      text: this.getContent(),
      size: this.params.SIZE
    };
    return (
      <span
        style={{ fontSize: attributes.size }}
      >
        { parser.toReact(attributes.text) }
      </span>
    )
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

class StrongTag extends parser.Tag {
  toReact(): JSX.Element {
    console.log(this.getContent())
    return <b>{ parser.toReact(this.getContent()) }</b>
  }
}

parser.registerTag('font', FontTag);
parser.registerTag('user', UserTag);
parser.registerTag('p', PTag);
parser.registerTag('url', URLTag);
parser.registerTag('size', SizeTag);
parser.registerTag('b', StrongTag);

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
