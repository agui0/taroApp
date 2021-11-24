export default {
  pages: [
    'pages/index/index',
    'pages/my/my',
    'pages/discover/discover',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#666",
    selectedColor: "#b4282d",
    backgroundColor: "#fafafa",
    borderStyle: 'black',
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页"
      },
      {
        pagePath: "pages/discover/discover",
        text: "发现"
      },
      {
        pagePath: "pages/my/my",
        text: "我的"
      }
    ]
  }
}
