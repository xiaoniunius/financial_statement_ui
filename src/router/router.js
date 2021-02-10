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
      title: '工资管理'
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'list',
        meta: {
          icon: 'md-funnel',
          title: '工资列表'
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
      title: '消费管理'
    },
    component: Main,
    children: [
      {
        path: 'list',
        name: 'list',
        meta: {
          icon: 'md-funnel',
          title: '消费列表'
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
        path: 'total',
        name: 'total',
        meta: {
          icon: 'md-funnel',
          title: '年度统计'
        },
        component: () => import('@/views/analysis/total.vue')
      },
      {
        path: 'oneself-year',
        name: 'oneself-year',
        meta: {
          icon: 'md-funnel',
          title: '个人年度统计'
        },
        component: () => import('@/views/analysis/oneself-year.vue')
      },
      {
        path: 'month-analysis',
        name: 'month-analysis',
        meta: {
          icon: 'md-funnel',
          title: '月度统计'
        },
        component: () => import('@/views/analysis/month-analysis.vue')
      },
      {
        path: 'oneself-month',
        name: 'oneself-month',
        meta: {
          icon: 'md-funnel',
          title: '个人月度统计'
        },
        component: () => import('@/views/analysis/oneself-month.vue')
      },
      {
        path: 'chart',
        name: 'chart',
        meta: {
          icon: 'md-funnel',
          title: '图表分析'
        },
        component: () => import('@/views/analysis/chart.vue')
      }
    ]
  }
];

export default routers;