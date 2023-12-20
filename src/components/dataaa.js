const data = [
  {
    "id": "Primary",
    "data": [
      {
        "x": 2019,
        "y": 3
      },
      {
        "x": 2020,
        "y": 4
      },
      {
        "x": 2021,
        "y": 2
      },
      {
        "x": 2022,
        "y": 5
      },
      {
        "x": 2023,
        "y": 3
      }
    ]
  },
  {
    "id": "Secondary",
    "data": [
      {
        "x": 2019,
        "y": 11
      },
      {
        "x": 2020,
        "y": 9
      },
      {
        "x": 2021,
        "y": 12
      },
      {
        "x": 2022,
        "y": 8
      },
      {
        "x": 2023,
        "y": 9
      }
    ]
  },
  {
    "id": "HigherSecondary",
    "data": [
      {
        "x": 2019,
        "y": 15
      },
      {
        "x": 2020,
        "y": 13
      },
      {
        "x": 2021,
        "y": 16
      },
      {
        "x": 2022,
        "y": 14
      },
      {
        "x": 2023,
        "y": 12
      }
    ]
  }
]


// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bump
import { ResponsiveBump } from '@nivo/bump'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBump = ({ data /* see data tab */ }) => (
    <ResponsiveBump
        data={data}
        colors={{ scheme: 'purple_blue_green' }}
        lineWidth={3}
        activeLineWidth={6}
        inactiveLineWidth={3}
        inactiveOpacity={0.15}
        pointSize={10}
        activePointSize={16}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: 'serie.color' }}
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -36
        }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'ranking',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
        axisRight={null}
    />
)