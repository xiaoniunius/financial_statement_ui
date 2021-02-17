import Main from '@/views/index.vue'
const routers = [
  {
    path: '/',
    meta: {
      title: ''
    },
    component: () => import('@/views/index.vue')
  },
  {
    path: '/wages',
    name: 'wages',
    meta: {
      icon: 'md-funnel',
      title: '收入管理'
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'list',
        meta: {
          icon: 'md-funnel',
          title: '收入列表'
        },
        component: () => import('@/views/wages/list.vue')
      }
    ]
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      icon: 'md-funnel',
      title: '支出管理'
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'list',
        meta: {
          icon: 'md-funnel',
          title: '支出列表'
        },
        component: () => import('@/views/detail/list.vue')
      }
    ]

  },
  {
    path: '/dictionary',
    name: 'dictionary',
    meta: {
      icon: 'md-funnel',
      title: '字典管理'
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'list',
        meta: {
          icon: 'md-funnel',
          title: '字典列表'
        },
        component: () => import('@/views/dictionary/list.vue')
      }
    ]
  },
  {
    path: '/analysis',
    name: 'analysis',
    meta: {
      icon: 'md-funnel',
      title: '统计管理'
    },
    component: Main,
    children: [
      {
        path: 'oneself-year',
        name: 'oneself-year',
        meta: {
          icon: 'md-funnel',
          title: '年度统计'
        },
        component: () => import('@/views/analysis/oneself-year.vue')
      },
      {
        path: 'oneself-month',
        name: 'oneself-month',
        meta: {
          icon: 'md-funnel',
          title: '月度统计'
        },
        component: () => import('@/views/analysis/oneself-month.vue')
      }
    ]
  },
  {
    path: '/analysis-chart',
    name: 'analysis-chart',
    meta: {
      icon: 'md-funnel',
      title: '报表分析'
    },
    component: Main,
    children: [
      {
        path: 'month-pay',
        name: 'month-pay',
        meta: {
          icon: 'md-funnel',
          title: '月度支出对比'
        },
        component: () => import('@/views/analys-chart/month-pay.vue')
      },
      {
        path: 'year-pay',
        name: 'year-pay',
        meta: {
          icon: 'md-funnel',
          title: '年度支出对比'
        },
        component: () => import('@/views/analys-chart/year-pay.vue')
      },
      {
        path: 'month-income-pay',
        name: 'month-income-pay',
        meta: {
          icon: 'md-funnel',
          title: '月度收支对比'
        },
        component: () => import('@/views/analys-chart/month-income-pay.vue')
      },
      {
        path: 'year-income-pay',
        name: 'year-income-pay',
        meta: {
          icon: 'md-funnel',
          title: '年度收支对比'
        },
        component: () => import('@/views/analys-chart/year-income-pay.vue')
      }
    ]
  }
];

export default routers;