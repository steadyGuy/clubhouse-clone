import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class AppDocument extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head>
          <title>Clubhouse: Drop-in audio chat</title>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,600;0,700;0,800;1,300&display=swap"
            rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
