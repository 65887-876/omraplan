/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        'dark': '#1C1C28', // Custom color used for text
        'primary': {
          1: '#ebeef0', // primary-1
          2: '#d0d6db', // primary-2
          3: '#aab6bf', // primary-3
          4: '#8394a1', // primary-4
          5: '#5d7485', // primary-5
          6: '#3a556a', // primary-6
          7: '#31485a', // primary-7
          8: '#293c4b', // primary-8
          9: '#21303c', // primary-9
          10: '#1a2630', // primary-10
        },
        'secondary': {
          1: '#f5f1e6', // secondary-1
          2: '#e6ddc3', // secondary-2
          3: '#d3c394', // secondary-3
          4: '#bea762', // secondary-4
          5: '#ab8c33', // secondary-5
          6: '#987306', // secondary-6
          7: '#816205', // secondary-7
          8: '#6c5204', // secondary-8
          9: '#574203', // secondary-9
          10: '#443403', // secondary-10
        },
        'neutral': {
          1: '#ffffff', //neutral-1
          13: '#0a2a3d', //neutral-13
        },
        success:{
          1: '#e7f3eb', // success-1
          2: '#c6e3cf', // success-2
          3: '#9acca9', // success-3
          4: '#6ab580', // success-4
          5: '#3d9e5a', // success-5
          6: '#138936', // success-6
          7: '#10742e', // success-7
          8: '#0d6126', // success-8
          9: '#0b4e1f', // success-9
          10: '#093e18',// success-10
        },
        info:{
          1: '#e6edf6', // info-1
          2: '#c2d5e9', // info-2
          3: '#92b3d8', // info-3
          4: '#5f8fc6', // info-4
          5: '#2f6eb5', // info-5
          6: '#014ea5', // info-6
          7: '#01428c', // info-7
          8: '#013775', // info-8
          9: '#012c5e', // info-9
          10: '#00234a',// info-10
        },
        danger:{
          1: '#fce8ea', // danger-1
          2: '#f7c9cc', // danger-2
          3: '#f09da3', // danger-3
          4: '#ea7078', // danger-4
          5: '#e34550', // danger-5
          6: '#dd1c29', // danger-6
          7: '#bc1823', // danger-7
          8: '##9d141d', // danger-8
          9: '#7e1017', // danger-9
          10: '#630d12',// danger-10
        },
        warning:{
          1: '#fef3e7', // warning-1
          2: '#fce3c5', // warning-2
          3: '#f9cd97', // warning-3
          4: '#f7b667', // warning-4
          5: '#f4a039', // warning-5
          6: '#f28b0e', // warning-6
          7: '#ce760c', // warning-7
          8: '#ac630a', // warning-8
          9: '#8a4f08', // warning-9
          10: '#6d3f06',// warning-10
        },
      },
      fontFamily: {
        'plus-jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'volkhov': ['Volkhov', 'serif'],
      },
      fontSize: {  // Font sizes should go under fontSize section
        'display-1': '64px',
        'display-2': '56px',
        'h1': '54px',
        'h2': '44px',
        'h3': '38px',
        'h4': '32px',
        'h5': '28px',
        'h6': '22px',
        'body-large': '16px',
        'body-small': '14px',
        'caption-large': '12px',
        'caption-small': '10px',
      },
    },
  },
  plugins: [],
}
