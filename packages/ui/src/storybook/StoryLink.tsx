// Storybook 전용 — 패키지에서 export 하지 않습니다.
// 스토리 안 링크를 눌러도 실제로 이동하지 않게 막는 링크 컴포넌트. `linkComponent={StoryLink}`로 넘깁니다.
import type { LinkComponentProps } from "../utils/link";

export function StoryLink({ href, children, onClick, ...rest }: LinkComponentProps) {
  return (
    <a
      href={href}
      {...rest}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
