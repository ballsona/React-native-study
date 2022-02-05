## Error Handling

1. fetch error : Network request failed [해결]

```js
const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
);
```

fetch url을 https를 생략하고 api~~부터 시작하니 오류가 나서 애먹었다.
