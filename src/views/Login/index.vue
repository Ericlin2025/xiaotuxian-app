<script setup>
import { ref,computed } from 'vue'
import { loginApi,getCodeApi } from '../../apis/testAPI'

const count = ref(0)
const userName = ref('')
const mobile = ref('')
const code = ref('')
const form = ref({
  mobile:'',
  code:'',
})
const Msg  = computed(()=>{
  return count.value===0?'获取验证码':`${count.value}秒后再次点击`
}) 
let timer
const sendMsg = async() => {

  //公共接口问题无法获取验证码，错误代码500
  // const res = await getCodeApi(mobile.value)
  // console.log(res)

  count.value = 5

  if (timer) {
    clearInterval(timer)
    timer = null
  }
  timer = setInterval(() => {
    if (count.value === 0) {
      clearInterval(timer)
      timer = null
    
      return
    }
    
    count.value--
    console.log(count.value)
  }, 1000)
}
const login = async() =>{
  form.value.mobile=mobile.value
  form.value.code=code.value
  console.log(form.value)
  const res = await loginApi(form.value)
  console.log(res)
  
}
</script>


<template>
  <div class="login-page">
    <div class="login-card">
      <header class="login-card__head">
        <h1 class="login-card__brand">小兔鲜儿</h1>
        <p class="login-card__sub">新鲜 · 亲民 · 快捷</p>
      </header>

      <form class="login-form" @submit.prevent>
        <label class="field">
          <span class="field__label">用户名</span>
          <input class="field__input" type="text" name="username" placeholder="请输入用户名" maxlength="32" autocomplete="username" v-model="userName"/>
        </label>

        <label class="field">
          <span class="field__label">手机号</span>
          <input class="field__input" type="tel" name="phone" placeholder="请输入手机号" maxlength="11" autocomplete="tel" v-model="mobile"/>
        </label>

        <div class="field">
          <span class="field__label">短信验证码</span>
          <div class="field__row">
            <input class="field__input" type="text" name="code" placeholder="请输入验证码(默认123456)" maxlength="6" autocomplete="one-time-code" v-model="code"/>
            <button type="button" class="btn btn--sms" @click="sendMsg" :disabled="count === 0 ? false : true">
              {{Msg}}
            </button>
          </div>
        </div>

        <button type="submit" class="btn btn--submit" @click="login">登 录</button>
      </form>

      <footer class="login-card__foot">
        <RouterLink class="login-card__link" to="/">返回首页</RouterLink>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
$primary: #27ba9b;

.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
  background: linear-gradient(165deg, #f0faf8 0%, #f5f5f5 45%, #eef8f6 100%);
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 36px 32px 28px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
}

.login-card__head {
  text-align: center;
  margin-bottom: 28px;
}

.login-card__brand {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: #333;
  letter-spacing: 0.06em;
}

.login-card__sub {
  margin: 8px 0 0;
  font-size: 13px;
  color: #999;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field__label {
  font-size: 14px;
  font-weight: 500;
  color: #666;
}

.field__input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &::placeholder {
    color: #c0c4cc;
  }

  &:hover {
    border-color: #c0c4cc;
  }

  &:focus {
    border-color: $primary;
  }
}

.field__row {
  display: flex;
  gap: 12px;
  align-items: stretch;

  .field__input {
    flex: 1;
    min-width: 0;
  }
}

.btn {
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.btn--sms {
  flex-shrink: 0;
  padding: 0 16px;
  white-space: nowrap;
  color: $primary;
  background: #fff;
  border-color: $primary;

  &:hover {
    color: #31c9a8;
    border-color: #31c9a8;
    background: rgba(39, 186, 155, 0.06);
  }

  &:disabled {
    color: #bbb;
    border-color: #e4e4e4;
    cursor: not-allowed;
    background: #fafafa;
  }
}

.btn--submit {
  width: 100%;
  height: 44px;
  margin-top: 4px;
  font-size: 16px;
  color: #fff;
  background: $primary;
  border-color: $primary;
  border-radius: 22px;

  &:hover {
    background: #31c9a8;
    border-color: #31c9a8;
  }

  &:active {
    background: #22a589;
    border-color: #22a589;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
}

.login-card__foot {
  margin-top: 20px;
  text-align: center;
}

.login-card__link {
  font-size: 13px;
  color: $primary;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
