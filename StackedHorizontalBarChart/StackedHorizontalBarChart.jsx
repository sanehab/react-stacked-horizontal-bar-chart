import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './StackedHorizontalBarChart.scss';
import { areTwoElementsOverlapping } from './utils';

const DefaultMarker = ({ position }) => (
  <div className={position === 'top' ? styles.arrow_down : styles.arrow_up} />
);
DefaultMarker.propTypes = {
  position: PropTypes.string.isRequired,
};

const StackedHorizontalBarChartBase = ({
  ranges,
  backgroundColors,
  points,
  edges,
  rangesPoints,
  classes,
  height,
  shouldLimitPointsPositions,
}) => {
  const calculatedRanges =
    (ranges && [0, ...ranges]) ||
    rangesPoints.reduce((acc, cur, index) => {
      const range = Math.abs(cur - rangesPoints[Math.max(index - 1, 0)]);
      acc.push(range);
      return acc;
    }, []);

  const rangesPrefixSums = calculatedRanges.reduce((acc, cur, index) => {
    acc.push(cur + (acc[index - 1] || 0));
    return acc;
  }, []);

  const totalWidth = rangesPrefixSums[rangesPrefixSums.length - 1];

  const rootElementRef = useRef();

  const changeMarkersPositionIfNeeded = useCallback(() => {
    const rootElement = rootElementRef.current;
    const markers = [
      ...rootElement.getElementsByClassName(styles.point_marker),
    ];
    const rangeEndPointsTexts = [
      ...rootElement.getElementsByClassName(styles.range_end_point_text),
    ];
    markers.forEach((marker) => {
      if (
        rangeEndPointsTexts.some((textElement) => {
          return areTwoElementsOverlapping(marker, textElement);
        })
      ) {
        marker.classList.add(classes.alleviated_marker);
      } else {
        marker.classList.remove(classes.alleviated_marker);
      }
    });
  }, [classes]);

  useEffect(() => {
    changeMarkersPositionIfNeeded();
  }, [changeMarkersPositionIfNeeded]);

  useEffect(() => {
    window.addEventListener('resize', changeMarkersPositionIfNeeded);

    return () =>
      window.removeEventListener('resize', changeMarkersPositionIfNeeded);
  }, [changeMarkersPositionIfNeeded]);

  return (
    <>
      <div className={styles.root} ref={rootElementRef}>
        {calculatedRanges.map((range, index) => {
          const widthPercentage = (range / totalWidth) * 100;
          const width = `${widthPercentage}%`;
          const rangeEndPointLeftPercentage =
            (rangesPrefixSums[index] / totalWidth) * 100;
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`${range}-${index}`}
              style={{
                height,
                width,
                background:
                  backgroundColors[(index - 1) % backgroundColors.length],
              }}
            >
              <div
                className={styles.range_end_point_container}
                style={{ left: `${rangeEndPointLeftPercentage}%` }}
              >
                <div className={styles.range_end_point_text_container}>
                  <span className={styles.range_end_point_text}>
                    {edges &&
                    (index === 0 || index === calculatedRanges.length - 1) ? (
                      <>{edges[index === 0 ? 0 : 1]}</>
                    ) : (
                      <>
                        {rangesPoints
                          ? rangesPoints[index]
                          : rangesPrefixSums[index]}
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {points.map((point, index) => {
          const {
            value,
            markerPosition = 'top',
            marker = <DefaultMarker position={markerPosition} />,
          } = point;
          const pointValue = ranges ? value : value - rangesPoints[0];
          const pointLeftPercentage = (pointValue / totalWidth) * 100;
          const safePointLeftPercentage = Math.min(
            Math.max(pointLeftPercentage, -1),
            101
          );
          const finalPointLeftPercentage = shouldLimitPointsPositions
            ? safePointLeftPercentage
            : pointLeftPercentage;
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`${pointValue}-${index}`}
              className={classNames(
                styles.point_container,
                styles[markerPosition]
              )}
              style={{
                left: `${finalPointLeftPercentage}%`,
              }}
            >
              <div className={styles.point_marker_container}>
                <div
                  className={classNames(
                    styles.point_marker,
                    styles[markerPosition]
                  )}
                >
                  {marker}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

StackedHorizontalBarChartBase.defaultProps = {
  classes: {},
  points: [],
  height: 10,
  shouldLimitPointsPositions: true,
};

StackedHorizontalBarChartBase.propTypes = {
  ranges: PropTypes.arrayOf(PropTypes.number),
  rangesPoints: PropTypes.arrayOf(PropTypes.number),
  backgroundColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  points: PropTypes.arrayOf(PropTypes.object),
  edges: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  height: PropTypes.number,
  classes: PropTypes.object,
  shouldLimitPointsPositions: PropTypes.bool,
};

export const StackedHorizontalBarChart = React.memo(
  StackedHorizontalBarChartBase
);
StackedHorizontalBarChart.displayName = 'StackedHorizontalBarChart';
