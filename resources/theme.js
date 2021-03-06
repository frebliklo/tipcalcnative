import { LayoutAnimation } from 'react-native'

export const animation = {
  springDuraion: 800,
  springDamping: 0.85
}

const springAnimationProperties = {
  type: LayoutAnimation.Types.spring,
  property: LayoutAnimation.Properties.opacity,
  springDamping: animation.springDamping
}

export const CustomAnimationConfig = {
  duration: animation.springDuraion,
  create: springAnimationProperties,
  update: springAnimationProperties,
  delete: springAnimationProperties
}

export const colors = {
  primary: '#151F8C',
  secondary: '#944AFC',
  black: '#3c3e4e',
  white: '#FFFFFF',
  gray: {
    "000": "#f9f9f9",
    "100": "#ededef",
    "200": "#e0e0e3",
    "300": "#d2d2d7",
    "400": "#c2c3c9",
    "500": "#b1b2ba",
    "600": "#9e9fa9",
    "700": "#868894",
    "800": "#696b7a",
    "900": "#3c3e4e"
  },
  indigo: {
    "000": "#eaebf4",
    "100": "#d3d5e9",
    "200": "#b8bcdc",
    "300": "#989dcc",
    "400": "#6c74b7",
    "500": "#15218c",
    "600": "#121d7c",
    "700": "#10196b",
    "800": "#0c1455",
    "900": "#080d37"
  },
  violet: {
    "000": "#eeeaf4",
    "100": "#dcd3e9",
    "200": "#c7b8dc",
    "300": "#ad98cc",
    "400": "#8a6cb7",
    "500": "#45158c",
    "600": "#3d127d",
    "700": "#35106b",
    "800": "#2a0d56",
    "900": "#1c0839"
  },
  fuschia: {
    "000": "#f3e9f4",
    "100": "#e6d2e8",
    "200": "#d7b6db",
    "300": "#c595cb",
    "400": "#ad69b5",
    "500": "#80158c",
    "600": "#73127d",
    "700": "#64106d",
    "800": "#510d59",
    "900": "#38093d"
  },
  red: {
    "000": "#f4eaeb",
    "100": "#e9d2d5",
    "200": "#dcb7bb",
    "300": "#cc979c",
    "400": "#b66b73",
    "500": "#8c1521",
    "600": "#7d121d",
    "700": "#6d1019",
    "800": "#590d15",
    "900": "#3d090e"
  },
  yellow: {
    "000": "#f1f0e3",
    "100": "#e2dfc5",
    "200": "#d2cda4",
    "300": "#bfb97e",
    "400": "#a9a050",
    "500": "#8c8015",
    "600": "#7e7312",
    "700": "#6e6410",
    "800": "#5a520d",
    "900": "#403a09"
  },
  teal: {
    "000": "#e5f2ea",
    "100": "#c9e4d4",
    "200": "#a9d4bb",
    "300": "#84c29d",
    "400": "#55ab78",
    "500": "#158c45",
    "600": "#127e3e",
    "700": "#106e36",
    "800": "#0d5a2c",
    "900": "#09401f"
  },
  cyan: {
    "000": "#e5f2f1",
    "100": "#c8e4e1",
    "200": "#a8d4d0",
    "300": "#82c1bb",
    "400": "#54aba2",
    "500": "#158c80",
    "600": "#127e73",
    "700": "#106e64",
    "800": "#0d5a53",
    "900": "#09403a"
  },
  blue: {
    "000": "#e7eef3",
    "100": "#ccdce6",
    "200": "#aec7d7",
    "300": "#8aadc5",
    "400": "#5c8daf",
    "500": "#155c8c",
    "600": "#12527d",
    "700": "#10476d",
    "800": "#0d3a58",
    "900": "#09283d"
  }
}
