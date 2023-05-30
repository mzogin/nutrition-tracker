import React, { useEffect } from 'react'
import Wrapper from '../../assets/wrappers/Tracking'
import { DateSlider } from '../../components/DateSlider'
import { Nutrient } from '../../components/Nutrient'
import { useAppContext } from '../../context/appContext'

export const Tracking = () => {
  const { showStats, stats, user, date } = useAppContext()
  useEffect(() => {
    showStats()
    // eslint-disable-next-line
  }, [date])

  if (user.requirements === undefined) {
    return <h1>test</h1>
  }

  const calcPercent = (amount, requiredAmount) => {
    const percent = (amount / requiredAmount) * 100
    if (percent >= 100) {
      return '100%'
    } else if (percent <= 1) {
      return '1%'
    } else {
      return `${percent}%`
    }
  }

  const calcColor = (amount, requiredAmount) => {
    const percent = amount / requiredAmount
    if (percent >= 1) {
      // green
      return '#00ff88'
    } else if (percent >= 0.85) {
      // lime
      return '#BBFF6D'
    } else if (percent >= 0.75) {
      // yellow
      return '#F1F862'
    } else {
      // red
      return '#D13E3E'
    }
  }

  const defaultStats = [
    {
      name: 'fiber',
      count: stats.FIBTG || 0,
      percent: calcPercent(stats.FIBTG, user.requirements.fiber),
      color: calcColor(stats.FIBTG, user.requirements.fiber),
    },
    {
      name: 'iron',
      count: stats.FE || 0,
      percent: calcPercent(stats.FE, user.requirements.iron),
      color: calcColor(stats.FE, user.requirements.iron),
    },
    {
      name: 'calcium',
      count: stats.CA || 0,
      percent: calcPercent(stats.CA, user.requirements.calcium),
      color: calcColor(stats.CA, user.requirements.calcium),
    },
    {
      name: 'vitamin A',
      count: stats.VITA_RAE || 0,
      percent: calcPercent(stats.VITA_RAE, user.requirements.vitA),
      color: calcColor(stats.VITA_RAE, user.requirements.vitA),
    },
    {
      name: 'vitamin B-1',
      count: stats.THIA || 0,
      percent: calcPercent(stats.THIA, user.requirements.thiamin),
      color: calcColor(stats.THIA, user.requirements.thiamin),
    },
    {
      name: 'vitamin B-2',
      count: stats.RIBF || 0,
      percent: calcPercent(stats.RIBF, user.requirements.vitB2),
      color: calcColor(stats.RIBF, user.requirements.vitB2),
    },
    {
      name: 'vitamin B-3',
      count: stats.NIA || 0,
      percent: calcPercent(stats.NIA, user.requirements.niacin),
      color: calcColor(stats.NIA, user.requirements.niacin),
    },
    {
      name: 'vitamin B-6',
      count: stats.VITB6A || 0,
      percent: calcPercent(stats.VITB6A, user.requirements.vitB6),
      color: calcColor(stats.VITB6A, user.requirements.vitB6),
    },
    {
      name: 'vitamin C',
      count: stats.VITC || 0,
      percent: calcPercent(stats.VITC, user.requirements.vitC),
      color: calcColor(stats.VITC, user.requirements.vitC),
    },
    {
      name: 'vitamin D',
      count: stats.VITD || 0,
      percent: calcPercent(stats.VITD, user.requirements.vitD),
      color: calcColor(stats.VITD, user.requirements.vitD),
    },
    {
      name: 'vitamin E',
      count: stats.TOCPHA || 0,
      percent: calcPercent(stats.TOCPHA, user.requirements.vitE),
      color: calcColor(stats.TOCPHA, user.requirements.vitE),
    },
    {
      name: 'vitamin K',
      count: stats.VITK1 || 0,
      percent: calcPercent(stats.VITK1, user.requirements.vitK),
      color: calcColor(stats.VITK1, user.requirements.vitK),
    },
    {
      name: 'phosphorus',
      count: stats.P || 0,
      percent: calcPercent(stats.P, user.requirements.phosphorus),
      color: calcColor(stats.P, user.requirements.phosphorus),
    },
    {
      name: 'potassium',
      count: stats.K || 0,
      percent: calcPercent(stats.K, user.requirements.potassium),
      color: calcColor(stats.K, user.requirements.potassium),
    },
    {
      name: 'magnesium',
      count: stats.MG || 0,
      percent: calcPercent(stats.MG, user.requirements.magnesium),
      color: calcColor(stats.MG, user.requirements.magnesium),
    },
    {
      name: 'folate',
      count: stats.FOLDFE || 0,
      percent: calcPercent(stats.FOLDFE, user.requirements.folate),
      color: calcColor(stats.FOLDFE, user.requirements.folate),
    },
    {
      name: 'zinc',
      count: stats.ZN || 0,
      percent: calcPercent(stats.ZN, user.requirements.zinc),
      color: calcColor(stats.ZN, user.requirements.zinc),
    },
  ]
  return (
    <Wrapper>
      <DateSlider />
      <section className='tracking'>
        {defaultStats.map((item, index) => {
          return <Nutrient key={index} {...item} />
        })}
      </section>
    </Wrapper>
  )
}
