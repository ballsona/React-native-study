### 자식에게 undefined 값 전달

```js
return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text>투어 정보</Text>
      {longitude && latitude && <Tour mapX={longitude} mapY={latitude} />}
    </View>
  </View>
);
```

App.js 에서 Tour컴포넌트로 longitude, latitude 값을 전달.
두 값이 불러와지기도 전에 Tour에게 전달된다면 undefined 값이 전달된다.
이를 방지하기 위해 longitude, latitude가 undefined가 아니라면 Tour에게 보내는 방법.
