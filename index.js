import { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Pressable, AppState } from 'react-native';
import { sprintf } from 'sprintf-js';

export default class CountDown extends Component {
    static propTypes = {
        id: PropTypes.string,
        digitStyle: PropTypes.object,
        digitTxtStyle: PropTypes.object,
        timeLabelStyle: PropTypes.object,
        separatorStyle: PropTypes.object,
        timeToShow: PropTypes.array,
        showSeparator: PropTypes.bool,
        size: PropTypes.number,
        until: PropTypes.number.isRequired,
        onChange: PropTypes.func,
        onPress: PropTypes.func,
        onFinish: PropTypes.func,
        textLabels: PropTypes.array,
        timeLabels: PropTypes.object,
        running: PropTypes.bool,
    };

    static defaultProps = {
        running: true,
        size: 20,
        timeToShow: ['D', 'H', 'M', 'S'],
        showSeparator: true,
        timeLabels: { d: 'Days', h: 'Hours', m: 'Minutes', s: 'Seconds' },
        textLabels: [':', ':', ':', ''],
    };

    state = {
        until: Math.max(this.props.until, 0),
        lastUntil: null,
        wentBackgroundAt: null,
    };

    componentDidMount() {
        this.timer = setInterval(this.updateTimer, 1000);
        this.appStateListener = AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        if (this.appStateListener?.remove) this.appStateListener.remove();
    }

    componentDidUpdate(prevProps) {
        if (this.props.until !== prevProps.until || this.props.id !== prevProps.id) {
            this.setState({
                lastUntil: this.state.until,
                until: Math.max(this.props.until, 0),
            });
        }
    }

    handleAppStateChange = (state) => {
        const { until, wentBackgroundAt } = this.state;
        if (state === 'active' && wentBackgroundAt && this.props.running) {
            const diff = Math.floor((Date.now() - wentBackgroundAt) / 1000);
            this.setState({ until: Math.max(0, until - diff), wentBackgroundAt: null });
        } else if (state === 'background') {
            this.setState({ wentBackgroundAt: Date.now() });
        }
    };

    updateTimer = () => {
        const { running, onChange, onFinish } = this.props;
        const { until } = this.state;

        if (!running) return;

        if (until <= 0) {
            if (onFinish && this.state.lastUntil !== 0) onFinish();
            this.setState({ lastUntil: 0, until: 0 });
            return;
        }

        const newUntil = until - 1;
        if (onChange) onChange(newUntil);
        this.setState({ lastUntil: until, until: newUntil });
    };

    getTimeLeft = () => {
        const { until } = this.state;
        return {
            seconds: until % 60,
            minutes: Math.floor(until / 60) % 60,
            hours: Math.floor(until / 3600) % 24,
            days: Math.floor(until / 86400),
        };
    };

    renderDigit = (value) => {
        const { digitStyle, digitTxtStyle, size } = this.props;
        return (
            <View style={[styles.digitCont, { width: size * 2.3, height: size * 2.6 }, digitStyle]}>
                <Text style={[styles.digitTxt, { fontSize: size }, digitTxtStyle]}>{value}</Text>
            </View>
        );
    };

    renderLabel = (label) => {
        const { timeLabelStyle, size } = this.props;
        if (!label) return null;
        return (
            <Text style={[styles.timeTxt, { fontSize: size / 1.8 }, timeLabelStyle]}>
                {label}
            </Text>
        );
    };

    renderDoubleDigits = (label, digits) => (
        <View style={styles.doubleDigitCont}>
            <View style={styles.timeInnerCont}>{this.renderDigit(digits)}</View>
            {this.renderLabel(label)}
        </View>
    );

    renderSeparator = (text = ':') => {
        const { separatorStyle, size } = this.props;
        return (
            <View style={styles.separatorCont}>
                <Text style={[styles.separatorTxt, { fontSize: size * 1.2 }, separatorStyle]}>
                    {text}
                </Text>
            </View>
        );
    };

    renderCountDown = () => {
        const { timeToShow, timeLabels, showSeparator, textLabels, onPress } = this.props;
        const { days, hours, minutes, seconds } = this.getTimeLeft();
        const formatted = sprintf('%02d:%02d:%02d:%02d', days, hours, minutes, seconds).split(':');
        const Cmp = onPress ? Pressable : View;

        const segments = [];

        if (timeToShow.includes('D')) segments.push(this.renderDoubleDigits(timeLabels.d, formatted[0]));
        if (showSeparator && timeToShow.includes('D') && timeToShow.includes('H'))
            segments.push(this.renderSeparator(textLabels?.[0]));

        if (timeToShow.includes('H')) segments.push(this.renderDoubleDigits(timeLabels.h, formatted[1]));
        if (showSeparator && timeToShow.includes('H') && timeToShow.includes('M'))
            segments.push(this.renderSeparator(textLabels?.[1]));

        if (timeToShow.includes('M')) segments.push(this.renderDoubleDigits(timeLabels.m, formatted[2]));
        if (showSeparator && timeToShow.includes('M') && timeToShow.includes('S'))
            segments.push(this.renderSeparator(textLabels?.[2]));

        if (timeToShow.includes('S')) segments.push(this.renderDoubleDigits(timeLabels.s, formatted[3]));

        return (
            <Cmp style={styles.timeCont} onPress={onPress}>
                {segments}
            </Cmp>
        );
    };

    render() {
        return <View style={this.props.style}>{this.renderCountDown()}</View>;
    }
}

const styles = StyleSheet.create({
    timeCont: { flexDirection: 'row', justifyContent: 'center' },
    timeTxt: { color: 'white', marginVertical: 2, backgroundColor: 'transparent' },
    timeInnerCont: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    digitCont: { borderRadius: 5, marginHorizontal: 2, alignItems: 'center', justifyContent: 'center' },
    doubleDigitCont: { justifyContent: 'center', alignItems: 'center' },
    separatorCont: { justifyContent: 'center', alignItems: 'center' },
    digitTxt: { color: 'white', fontWeight: 'bold', fontVariant: ['tabular-nums'] },
    separatorTxt: { backgroundColor: 'transparent', fontWeight: 'bold' },
});
