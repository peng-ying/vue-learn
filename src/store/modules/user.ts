// 需引入store 是主入口对应的整个vuex模块的store，去掉报错Store not provided in decorator options...
import store from '@/store'
import { 
VuexModule, 
Module,
Action,
Mutation,
getModule,} from 'vuex-module-decorators'

// export interface 只是对一个东西的声明（不能具体的操作）
export interface MyUserState {
    idToken: string;
}

// 定义一个modules，直接使用装饰器@Module
// 这里不同于vuex的Module类，这里有参数，声明了命名空间
// 参数store即为入口页对应的整个vuex模块的store
@Module({dynamic: true, store, name: 'user'})
class User extends VuexModule implements MyUserState {
    public idToken = '';

    // public State 对应 state
    // get 对应 getters
    get GET_TOKEN() {
        return this.idToken;
    }

    // @Mutation 表示的是mutations
    // 不能使用箭头函数来定义函数 因为在代码需要在运行重新绑定执行的上下文
    @Mutation
    private SET_TOKEN(token: string) {
        // 一旦使用@Mutation装饰某一函数后, 函数内的this上下文即指向当前的state，所以想引用state的值，可以直接this.token访问即可。
        this.idToken = token;
    }

    // @Action 表示的是action  可以执行异步操作 最后提交的是mutation
    // 同样不能使用箭头函数
    @Action
    public async Login(params: any) {
        const {username, password, router} = params;
        if(username && password) {
            new Promise(
                (resolve) => {
                    setTimeout(() => {
                        // const { data } = await login(username, password)
                        this.SET_TOKEN('123456')
                    }, 1000)
                    resolve('登录成功！')
                }
            ).then(res => {
                router.push({name: 'dashboard'})
                console.log(res);
            })
        }
    }
}

export const UserModule = getModule(User)