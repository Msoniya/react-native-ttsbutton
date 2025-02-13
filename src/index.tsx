import React, { useState, useMemo, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Animated,
} from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native';
interface TTSButtonProps {
  text: string;
  onPress: () => Promise<void> | void;
  backgroundColor?: string;
  textColor?: string;
  type?: 'primary' | 'default' | 'danger' | 'dashed' | 'text' | 'link';
  size?: 'small' | 'default' | 'large';
  customStyle?: ViewStyle;
  customTextStyle?: TextStyle;
  loaderPosition?: 'start' | 'end';
  loaderColor?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  shape?: 'default' | 'oval' | 'circle';
  ghost?: boolean;
  gradientColors?: string[];
}

const BUTTON_STYLES = {
  primary: { backgroundColor: '#007BFF', borderColor: '#007BFF' },
  default: { backgroundColor: '#F0F0F0', borderColor: '#D0D0D0' },
  danger: { backgroundColor: '#DC3545', borderColor: '#DC3545' },
  dashed: {
    backgroundColor: 'transparent',
    borderColor: '#007BFF',
    borderStyle: 'dashed',
  },
  text: { backgroundColor: 'transparent', borderColor: 'transparent' },
  link: { backgroundColor: 'transparent', borderColor: 'transparent' },
};

const TEXT_COLORS = {
  primary: '#FFFFFF',
  default: '#000000',
  danger: '#FFFFFF',
  dashed: '#007BFF',
  text: '#007BFF',
  link: '#007BFF',
};

const SIZE_STYLES = {
  small: { padding: 8, minWidth: 40, minHeight: 40 },
  default: { padding: 12, minWidth: 50, minHeight: 50 },
  large: { padding: 16, minWidth: 60, minHeight: 60 },
};

const TEXT_SIZE = {
  small: { fontSize: 14 },
  default: { fontSize: 16 },
  large: { fontSize: 18 },
};

export const TTSButton: React.FC<TTSButtonProps> = React.memo(
  ({
    text,
    onPress,
    backgroundColor,
    textColor,
    type = 'default',
    size = 'default',
    customStyle,
    customTextStyle,
    loaderPosition = 'start',
    loaderColor,
    startIcon,
    endIcon,
    shape = 'default',
    ghost = false,
  }) => {
    const [loadings, setLoadings] = useState<boolean>(false);
    const scaleValue = useRef(new Animated.Value(1)).current;

    const enterLoading = () => {
      if (loadings) return;
      if (!isCircle) {
        setLoadings((prevLoadings) => !prevLoadings);
        onPress();
        setTimeout(() => {
          setLoadings((prevLoadings) => !prevLoadings);
        }, 2000);
      }
    };

    const isCircle = shape === 'circle';
    const isOval = shape === 'oval';

    const dynamicDimensions = useMemo(() => {
      const { minWidth, minHeight } = SIZE_STYLES[size];
      if (isCircle) {
        const dimension = Math.max(minWidth, minHeight);
        return {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
        };
      }
      if (isOval) {
        const baseWidth = 40;
        const baseHeight = 30;
        const padding = 10;

        let calculatedWidth = baseWidth;

        if (text) {
          calculatedWidth += text.length * 6;
        }
        if (startIcon || endIcon) {
          calculatedWidth += baseWidth;
        }

        return {
          width: calculatedWidth,
          height: baseHeight,
          borderRadius: baseHeight,
          paddingHorizontal: padding,
        };
      }
      return {
        borderRadius: 8,
      };
    }, [size, isCircle, isOval, endIcon, startIcon, text]);

    const buttonContent = useMemo(() => {
      if (isCircle) {
        return (
          startIcon || (
            <Text
              style={[
                TEXT_SIZE[size],
                { color: textColor || TEXT_COLORS[type] },
                customTextStyle,
              ]}
            >
              {text.charAt(0)}
            </Text>
          )
        );
      }
      return (
        <>
          {startIcon && !loadings && (
            <View style={styles.icon}>{startIcon}</View>
          )}
          <Text
            style={[
              TEXT_SIZE[size],
              { color: textColor || TEXT_COLORS[type] },
              customTextStyle,
              type === 'link' && styles.linkText,
            ]}
          >
            {text}
          </Text>
          {endIcon && !loadings && <View style={styles.icon}>{endIcon}</View>}
        </>
      );
    }, [
      isCircle,
      startIcon,
      text,
      size,
      textColor,
      type,
      customTextStyle,
      loadings,
      endIcon,
    ]);

    const buttonStyle = useMemo(
      () => [
        styles.button,
        BUTTON_STYLES[type],
        SIZE_STYLES[size],
        type === 'dashed' && styles.dashed,
        type === 'link' && styles.link,
        backgroundColor && { backgroundColor },
        customStyle,
        ghost && styles.ghost,
        dynamicDimensions,
      ],
      [type, size, backgroundColor, customStyle, ghost, dynamicDimensions]
    );

    const loader =
      !isCircle && loadings ? (
        <ActivityIndicator
          size="small"
          color={loaderColor || TEXT_COLORS[type]}
          style={[styles.loader, loaderPosition === 'end' && styles.loaderEnd]}
        />
      ) : null;

    const handlePressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity
          style={buttonStyle}
          onPress={enterLoading}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
          disabled={loadings}
        >
          <View style={styles.contentContainer}>
            {loaderPosition === 'start' && loader}
            {buttonContent}
            {loaderPosition === 'end' && loader}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  gradientWrapper: {
    borderRadius: 8,
  },
  defaultShape: {
    borderRadius: 8,
  },
  dashed: {
    borderWidth: 1.5,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    borderWidth: 0,
  },
  loader: {
    marginHorizontal: 10,
  },
  loaderEnd: {
    marginLeft: 10,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  icon: {
    marginHorizontal: 10,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
});

export default TTSButton;
