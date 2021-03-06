angular.module('proton.message')
  .directive('actionMessage', ($rootScope, messageBuilder) => ({
    scope: {
      model: '=actionMessage'
    },
    link(scope, el, { actionMessageType }) {
      function onClick(e) {
        e.preventDefault();

        if (/addFile|addEmbedded/.test(actionMessageType)) {
            const dropzone = $(el).parents('.composer').find('.dropzone');

            return $rootScope.$emit('addFile', {dropzone, asEmbedded: (actionMessageType === 'addEmbedded')});
        }

        const msg = messageBuilder.create(actionMessageType, scope.model);

        if (actionMessageType === 'new') {
            return $rootScope.$emit('newMessage', msg);
        }

        $rootScope.$emit('loadMessage', msg, (actionMessageType === 'forward' || msg.Attachments.length > 0));
      }

      el.on('click', onClick);

      scope
        .$on('$destroy', () => {
          el.off('click', onClick);
        });
    }
  }));
