module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    messages: {
      skip: ':可跳过',
      max: '最多 %d 个字符',
      min: '至少 %d 个字符',
      emptyWarning: '不能为空',
      upperLimitWarning: '上限警告',
      lowerLimitWarning: '下限警告'
    },
    questions: {
      type: {
        description: '选择你要提交的修改类型:',
        enum: {
          feat: {
            description: '添加新功能',
            title: 'Features',
            emoji: '✨'
          },
          fix: {
            description: '修复 Bug',
            title: 'Bug Fixes',
            emoji: '🐛'
          },
          docs: {
            description: '仅有文档的变化',
            title: 'Documentation',
            emoji: '📚'
          },
          style: {
            description: '不影响代码含义的变化（空格、格式化、缺少分号等）',
            title: 'Styles',
            emoji: '💎'
          },
          refactor: {
            description: '一个既没有修复错误也没有增加功能的代码修改',
            title: 'Code Refactoring',
            emoji: '📦'
          },
          perf: {
            description: '提高性能的代码修改',
            title: 'Performance Improvements',
            emoji: '🚀'
          },
          test: {
            description: '添加缺失的测试或纠正现有的测试',
            title: 'Tests',
            emoji: '🚨'
          },
          build: {
            description: '影响构建系统或外部依赖的变化（例如范围：gulp、broccoli、npm）',
            title: 'Builds',
            emoji: '🔨'
          },
          ci: {
            description:
              '对我们CI配置文件和脚本的修改（例子范围：Travis、Circle、BrowserStack、SauceLabs）',
            title: 'Continuous Integrations',
            emoji: '⚙️'
          },
          chore: {
            description: '其他不修改src或测试文件的改动',
            title: 'Chores',
            emoji: '♻️'
          },
          revert: {
            description: '恢复之前的提交',
            title: 'Reverts',
            emoji: '🗑'
          }
        }
      },
      scope: {
        description: '这个变化的范围是什么（例如，组件或文件名）'
      },
      subject: {
        description: '写一个简短的、命令式的变化描述'
      },
      body: {
        description: '提供一个较长的变化描述'
      },
      isBreaking: {
        description: '是否有任何突破性变化'
      },
      breakingBody: {
        description: '一个突破性变化的提交需要一个主体。请输入关于该提交本身的较长描述'
      },
      breaking: {
        description: '描述突破性的变化'
      },
      isIssueAffected: {
        description: '这个改变是否影响到任何未解决的问题'
      },
      issuesBody: {
        description: '如果问题被关闭，提交需要一个正文。请输入关于提交本身的较长的描述'
      },
      issues: {
        description: '添加问题参考（例如，"fix #123"，"re #123"）'
      }
    }
  }
}
