'use client'

import {
  DecoratorNode,
  type DOMConversionMap,
  type DOMConversionOutput,
  type DOMExportOutput,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
} from 'lexical'

export type ImageNodeProps = {
  src: string
  altText: string
  maxWidth?: number
  width?: 'inherit' | number
  height?: 'inherit' | number
}

export type SerializedImageNode = Spread<
  {
    src: string
    altText: string
    maxWidth: number
    width: 'inherit' | number
    height: 'inherit' | number
  },
  SerializedLexicalNode
>

const DEFAULT_MAX_WIDTH = 400

export const $createImageNode = ({
  altText,
  height,
  maxWidth = DEFAULT_MAX_WIDTH,
  src,
  width,
}: ImageNodeProps) => {
  return new ImageNode({ altText, height, maxWidth, src, width })
}

export const $isImageNode = (node: LexicalNode | null | undefined): node is ImageNode =>
  node instanceof ImageNode

const convertImageElement = (domNode: Node): DOMConversionOutput | null => {
  if (domNode instanceof HTMLImageElement) {
    const { src, alt } = domNode
    const node = $createImageNode({ src, altText: alt })
    return { node }
  }
  return null
}

export class ImageNode extends DecoratorNode<React.JSX.Element> {
  __src: string
  __altText: string
  __height: 'inherit' | number
  __width: 'inherit' | number
  __maxWidth: number

  constructor(
    props: ImageNodeProps = { src: '', altText: '' },
    key?: NodeKey,
  ) {
    super(key)
    this.__altText = props.altText
    this.__width = props.width ?? 'inherit'
    this.__height = props.height ?? 'inherit'
    this.__maxWidth = props.maxWidth ?? DEFAULT_MAX_WIDTH
    this.__src = props.src
  }

  static getType(): string {
    return 'image'
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      {
        altText: node.__altText,
        src: node.__src,
        height: node.__height,
        width: node.__width,
        maxWidth: node.__maxWidth,
      },
      node.__key,
    )
  }

  static importJSON(json: SerializedImageNode): ImageNode {
    const { src, altText, maxWidth, width, height } = json
    return $createImageNode({ src, altText, maxWidth, width, height })
  }

  exportJSON(): SerializedImageNode {
    return {
      src: this.__src,
      altText: this.__altText,
      maxWidth: this.__maxWidth,
      width: this.__width,
      height: this.__height,
      type: 'image',
      version: 1,
    }
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: () => ({ conversion: convertImageElement, priority: 0 }),
    }
  }

  exportDOM(): DOMExportOutput {
    const image = document.createElement('img')
    image.setAttribute('src', this.__src)
    image.setAttribute('alt', this.__altText)
    return { element: image }
  }

  createDOM(): HTMLElement {
    const span = document.createElement('span')
    return span
  }

  updateDOM(): false {
    return false
  }

  decorate(): React.JSX.Element {
    return (
      <img
        src={this.__src}
        alt={this.__altText}
        style={{
          width: this.__width,
          height: this.__height,
          maxWidth: this.__maxWidth,
        }}
      />
    )
  }
}
