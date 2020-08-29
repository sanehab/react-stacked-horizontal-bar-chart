module.exports = {
  entry: { index: './StackedHorizontalBarChart/StackedHorizontalBarChart.jsx' },
  output: {
    libraryTarget: 'umd',
    globalObject: 'this',
    filename: 'index.js',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        exclude: /\.st.css$/,
        oneOf: [
          {
            include: /node_modules/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  modules: false,
                },
              },
              {
                loader: 'sass-loader',
              },
            ],
          },
          {
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[name]_[local]',
                  },
                  importLoaders: 1
                },
              },
              {
                loader: 'postcss-loader',
              },
              {
                loader: 'sass-loader',
              },
            ],
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': 'ReactDOM',
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
    },
  },
};
