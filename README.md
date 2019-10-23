# 常用api
## 1. fromJS(): js -> immutable 
  ```js
  import {fromJS} from "redux-immutable"
  const initialState = fromJS({
    loading: false,
    data: {
      list: [],
      msg:""
    }
  })
  ```
## 2. toJS(): immutable->js
```js
const newList = payload.list.concat(state.getIn(["data","list"]).toJS());
```
## 3. get getIn
 ```js
const mapStateToProps = state => ({
  // articles: state.get("articles").get("data").get("list"),
  articles: state.getIn(["articles","data", "list"]),
 })
 ```
 ## 4. set setIn merge
 ```js
 case ARTICLES_FETCH_REQUEST:
    return state.set("loading", true)
 case ARTICLES_FETCH_SUCCESS:
    const newList = payload.list.concat(state.getIn(["data","list"]).toJS());
    // return state.setIn(["loading"], false).setIn(["data","list"], newList).setIn(["data","msg"],paylod.msg)
    return state.merge({
      loading: false,
      data: {
        list: newList,
        msg: payload.msg
      }
  ```
## 5. update updateIn 
```js
case INCRESEMENT:
  return state.update("count", v=> v+1)
case ARTICLES_FETCH:
  return state.updateIn(["data", "list"], v=> payload.list.concat(v))
```
## 6. map
immutable的Map不用转toJS也可用map()方法遍历数组元素
