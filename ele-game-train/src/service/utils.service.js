import Taro from '@tarojs/taro';

export function redirectTo(url, qs = '') {
    Taro.redirectTo({
        url: `/pages/${url}/${url}?${qs}`
    });
}
export function navigateTo(url, qs = '') {
    Taro.navigateTo({
        url: `/pages/${url}/${url}?${qs}`
    });
}
export function switchTab(url) {
    Taro.switchTab({
        url: `/pages/${url}/${url}`
    });
}

export function showToast(title) {
    Taro.showToast({
        title,
        icon: 'none'
    });
}

export function formatTime(time) {
    time = time.split(' ')[0].split('-');
    return `${time[1]}月${time[2]}日`;
}

export function qs(query){
    let qs = ''
    for (var i in query) {
        qs += i + '='+ query[i] + '&'
    }
    console.log('query',qs);
    return qs;
}