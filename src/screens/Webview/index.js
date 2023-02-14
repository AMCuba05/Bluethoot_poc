import React from 'react'
import WebView from 'react-native-webview'

const ScoreWebview = () => {
    return <WebView source={{ uri: 'https://sportretina.net/matchscore/score.php' }} />
}

export default ScoreWebview
