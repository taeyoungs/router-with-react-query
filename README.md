# React Router with React Query experiment

## 개요

React Router v6.4.3+를 React Query와 함께 사용해 보기 위한 저장소이며, 본 저장소에 사용되는 JSX와 CSS는 React Router tutorial 코드를 기반으로 합니다.

## 데이터 구조

### `Contact`

```typescript
{
  id: string;
  favorite: boolean;
  createdAt: number;
  first?: string;
  last?: string;
  notes?: string;
  twitter?: string;
}
```
