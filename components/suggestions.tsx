import { IMPROVEMENT_SUGGESTIONS } from '@/components/constants'
export default function Suggestions() {
  return (
    <div>
      {IMPROVEMENT_SUGGESTIONS.map((suggestion) => (
        <div key={suggestion.id}>
          <h3>{suggestion.title}</h3>
          <p>
            <strong>Descripción:</strong> {suggestion.description}
          </p>
          <p>
            <strong>Acción Propuesta:</strong> {suggestion.action}
          </p>
          <p>
            <strong>Impacto:</strong> {suggestion.impact}
          </p>
        </div>
      ))}
    </div>
  )
}
