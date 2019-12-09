import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import adminList from '@/views/containers/admin/list';
import ElementUI from 'element-ui';
import Api from '../../../../api'
import VueRouter from 'vue-router'

const localVue = createLocalVue();
localVue.use(ElementUI);
// https://vue-test-utils.vuejs.org/zh/guides/using-with-vue-router.html
// localVue.use(VueRouter)
localVue.prototype.$api = Api

const router = new VueRouter()

jest.mock('../../../../api')
Api.test.getList.mockResolvedValue({
  "total": 4,
  "data": [
    {
      "id": 1,
      "title": "第一个",
      "page": 1
    },
    {
      "id": 2,
      "title": "第二个",
      "page": 1
    },
    {
      "id": 3,
      "title": "第三个",
      "page": 1
    },
    {
      "id": 4,
      "title": "第四个",
      "page": 1
    }
  ]
});

describe('admin list', () => {
  const wrapper = mount(adminList, {
    localVue,
    router,
    mocks: {
      $route: {
        params: { id: 1 }
      }
    }
  })

  test('getUserInfo 有且只 call 了一次', () => {
    expect(Api.test.getList.mock.calls.length).toBe(1);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.status.total).toBe(4)
    })
  });

  test('获取列表按钮', () => {
    wrapper.find('#getList').trigger('click')

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.status.total).toBe(4)
    })
  })

  test('清空按钮', () => {
    wrapper.find('#clearSearch').trigger('click')

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.search.title).toBe('')
      expect(wrapper.vm.search.pagenum).toBe(1)
    })
  })

  test('打开弹窗', () => {
    wrapper.find('#openDialog').trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.status.dialog).toBe(true)
    })
  })
});
