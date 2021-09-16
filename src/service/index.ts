import request from '../utils/request';

export function getBlogList() {
  return request({
    url: '/repos/wenqiii/share/issues',
    method: 'get',
  });
}

export function getBlogDetail(params) {
  return request({
    url: '/repos/wenqiii/share/issues/' + params.id,
    method: 'get',
  });
}
