# logger.js

Tired of console.log pain in your applications? Look no further. logger.js is a simple to use and lightweight vanilla js wrapper around the old console.log.

logger.js helps you centralize and gain full control of your logs around the application.

## Prerequisites

None. Just plain old Javascript ;)

## Installation
```bash
    npm install insights-logger.js
```

## Usage

### Types of logs
```js
	Logger.log('Test with log');
	Logger.warn('Test with warn');
	Logger.info('Test with info');
	Logger.error('Test with error');
```

###  Sending parameters
```js
    Logger.log('One param', 'String');
    Logger.log('Many params', 'String', 1, true, {test: 'logger'}, function () {});
```
### Inactivate all logs
```js
    Logger.inactive();
```

### Activate all logs
```js
    Logger.active();
```
## Namespaces
Using namespaces you can group your logs together, making it very easy to manage them:

```js
    Logger.ns('MY_MODULE').log('myFunction1');
    Logger.ns('MY_MODULE2').log('myFunction2');
    Logger.ns('MY_MODULE3').log('myFunction3');
```

### Namespaces - inactivate logs
```js
    Logger.ns('MY_MODULE').inactive();    
```

### Namespaces - activate logs
```js
    Logger.ns('MY_MODULE').active();
```

## Browser compatibility

- Internet Explorer 9+
- Firefox
- Chrome

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
