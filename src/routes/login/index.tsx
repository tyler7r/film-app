import { $, component$, useStore } from "@builder.io/qwik";
import styles from './login.module.css'
import { DocumentHead } from "@builder.io/qwik-city";
import { Button } from "~/components/button";

const Login = component$(() => {
    const info = useStore({
        username: '',
        password: '',
        confirmPwd: ''
    })

    const submit = $(() => {
        //post logic here
    })

    return (
        <div class={styles['login-container']}>
            <h2 class={styles['page-title']}>Login!</h2>
            <form class={styles['login-form']} preventdefault:submit onSubmit$={submit}>
                <label class={styles['login-input']}>
                    <div class={styles['login-title']}>Username</div>
                    <input type='text' onInput$={(e) => info.username = (e.target as HTMLInputElement).value} value={info.username} />
                </label>
                <label class={styles['login-input']}>
                    <div class={styles['login-title']}>Password</div>
                    <input type='password' onInput$={(e) => info.password = (e.target as HTMLInputElement).value} value={info.password} />
                </label>
                <label class={styles['login-input']}>
                    <div class={styles['login-title']}>Confirm Password</div>
                    <input type='password' onInput$={(e) => info.confirmPwd = (e.target as HTMLInputElement).value} value={info.confirmPwd} />
                </label>
                <Button class={styles['login-btn']}>Login</Button>
            </form>
            <div class={styles['no-account-container']}>
                <div class={styles['no-account-message']}>Don't Have an Account?</div>
                <a href='/signup' class={styles['no-account-link']}>Sign Up!</a>
            </div>
        </div>
    )
})

export default Login

export const head: DocumentHead = {
    title: "Film Room Login",
    meta: [
      {
        name: "description",
        content: "Login in to your account!",
      },
    ],
  };