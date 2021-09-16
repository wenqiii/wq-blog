export enum BlogType {
  Latest = 0,
  Js = 1,
  Vue = 2,
  React = 3,
  Css = 4,
  Html = 5,
}

export const navList = [
  { id: BlogType.Latest, name: '最新' },
  { id: BlogType.Js, name: 'js' },
  { id: BlogType.Vue, name: 'vue' },
  { id: BlogType.React, name: 'react' },
  { id: BlogType.Css, name: 'css' },
  { id: BlogType.Html, name: 'html' },
];
