const HTTP_SCHEMA = window.location.protocol

const API_ROOT_DEV = `${HTTP_SCHEMA}//172.28.29.13:8080/portal`
const API_ROOT_PROD = `${HTTP_SCHEMA}//172.28.29.13:8080/portal`
const API_IMG_DEV = `${HTTP_SCHEMA}//172.28.29.13/images/group1/portal`
const API_IMG_PROD = `${HTTP_SCHEMA}//172.28.29.13/images/group1/portal`

export const NODE_ENV = process.env.REACT_APP_NODE_ENV;

export const API_ROOT = ((env) => {
    switch (env) {
    case 'dev':
        return API_ROOT_DEV
    case 'prod':
        return API_ROOT_PROD
    default:
        throw new Error(`Invalid env: ${NODE_ENV}`)
    }
})(NODE_ENV)

export const API_IMG = ((env) => {
    switch (env) {
    case 'dev':
        return API_IMG_DEV
    case 'prod':
        return API_IMG_PROD
    default:
        throw new Error(`Invalid env: ${NODE_ENV}`)
    }
})(NODE_ENV)


/**
 * 路由前缀基准路径
 */
export const APP_ROOT_BASE_NAME = process.env.PUBLIC_URL || '/';

/**
 * 页面根地址
 */
export const APP_ROOT = window.location.origin + APP_ROOT_BASE_NAME;