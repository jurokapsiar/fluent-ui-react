import {
  ComponentSlotStylesPrepared,
  ICSSInJSStyle,
  ComponentSlotStyleFunction,
} from '@fluentui/styles'
import { DropdownProps, DropdownState } from '../../../../components/Dropdown/Dropdown'
import { DropdownVariables } from './dropdownVariables'
import getBorderFocusStyles from '../../getBorderFocusStyles'

type DropdownPropsAndState = DropdownProps & DropdownState

const transparentColorStyle: ICSSInJSStyle = {
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  borderBottomColor: 'transparent',
}

const transparentColorStyleObj: ICSSInJSStyle = {
  ...transparentColorStyle,
  ':hover': transparentColorStyle,
  ':active': transparentColorStyle,
  ':focus': {
    ...transparentColorStyle,
    ':active': transparentColorStyle,
  },
}

const getIndicatorStyles: ComponentSlotStyleFunction<DropdownPropsAndState, DropdownVariables> = ({
  variables: v,
  props: p,
}): ICSSInJSStyle => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',

  backgroundColor: 'transparent',
  cursor: 'pointer',
  userSelect: 'none',

  margin: 0,
  position: 'absolute',
  right: 0,
  height: '100%',
  width: v.toggleIndicatorSize,
  ...(p.inverted && {
    backgroundColor: v.backgroundColorInverted,

    ':hover': {
      backgroundColor: v.backgroundColorHoverInverted,
    },
  }),
})

const getWidth = (p: DropdownPropsAndState, v: DropdownVariables): string => {
  if (p.fluid) {
    return '100%'
  }

  if (p.inline) {
    return 'initial'
  }

  return v.width
}

const dropdownStyles: ComponentSlotStylesPrepared<DropdownPropsAndState, DropdownVariables> = {
  root: ({ props: p }): ICSSInJSStyle => ({
    ...(p.inline && { display: 'inline-flex' }),
  }),

  container: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    borderStyle: 'solid',
    borderColor: v.borderColor,
    outline: 0,
    width: getWidth(p, v),
    borderWidth: p.search ? `0 0 ${v.searchBorderBottomWidth} 0` : v.borderWidth,
    color: v.color,
    backgroundColor: v.backgroundColor,
    borderRadius: v.containerBorderRadius,
    ...(p.open && p.position === 'above' && { borderRadius: v.openAboveContainerBorderRadius }),
    ...(p.open && p.position === 'below' && { borderRadius: v.openBelowContainerBorderRadius }),
    ':hover': {
      backgroundColor: v.backgroundColorHover,
      ...(!p.search && {
        borderColor: v.borderColorHover,
      }),
    },
    ':active': {
      backgroundColor: v.backgroundColor,
    },
    ...(p.focused && {
      backgroundColor: v.backgroundColor,
      ...(p.search && { borderBottomColor: v.borderColorFocus }),
      ...(!p.search &&
        !p.open &&
        p.isFromKeyboard &&
        getBorderFocusStyles({ siteVariables })[':focus-visible']),
    }),
    ...(p.inline && {
      ...transparentColorStyleObj,
      alignItems: 'center',
    }),
    ...(p.inverted && {
      backgroundColor: v.backgroundColorInverted,
      ':hover': {
        backgroundColor: v.backgroundColorHoverInverted,
      },
      ':active': {
        backgroundColor: v.backgroundColorHoverInverted,
      },
      ':focus': {
        backgroundColor: v.backgroundColorHoverInverted,
      },
    }),
  }),

  selectedItems: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
    maxHeight: v.selectedItemsMaxHeight,
    width: '100%',
    ...(p.toggleIndicator && { paddingRight: v.toggleIndicatorSize }),
  }),

  triggerButton: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      overflow: 'hidden',
      boxShadow: 'none',
      ...transparentColorStyleObj,
      margin: '0',
      justifyContent: 'left',
      padding: v.comboboxPaddingButton,
      ...(p.multiple && { minWidth: 0, flex: 1 }),
      ...transparentColorStyleObj,
      ':focus': {
        color: v.color,
        ...transparentColorStyleObj,
      },
      ':focus-visible': {
        color: v.color,
        ...transparentColorStyle,
        borderRightWidth: 0,
        ':after': {
          borderColor: 'transparent',
          borderRightWidth: 0,
        },
        ':before': {
          borderColor: 'transparent',
          borderRightWidth: 0,
        },
      },
      ':active': {
        color: v.color, // required for HC theme
        ...transparentColorStyle,
        animationName: 'unset',
        animationDuration: 'unset',
      },
      ':hover': {
        color: v.color, // required for HC theme
        ...transparentColorStyle,
      },
      ...(p.inline && {
        paddingLeft: 0,
        paddingRight: 0,
        width: 'initial',
      }),
    }
  },

  list: ({ props: p, variables: v }): ICSSInJSStyle => ({
    outline: 0,
    borderStyle: 'solid',
    borderWidth: p.open ? v.listBorderWidth : '0px',
    borderColor: v.listBorderColor,
    zIndex: v.overlayZIndex,
    maxHeight: v.listMaxHeight,
    overflowY: 'auto',
    width: getWidth(p, v),
    background: v.listBackgroundColor,
    ...(p.position === 'above' && { borderRadius: v.aboveListBorderRadius }),
    ...(p.position === 'below' && { borderRadius: v.belowListBorderRadius }),
    ...(p.open && {
      boxShadow: v.listBoxShadow,
      padding: v.listPadding,
    }),
  }),

  loadingMessage: ({ variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.listItemBackgroundColor,
  }),

  noResultsMessage: ({ variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.listItemBackgroundColor,
    fontWeight: 'bold',
  }),

  clearIndicator: getIndicatorStyles,
  toggleIndicator: getIndicatorStyles,
}

export default dropdownStyles
