import * as NextLink from "next/link";
import { Anchor, AnchorProps } from "@mantine/core";

interface LinkProps extends NextLink.LinkProps {
  target?: string;
  children: React.ReactNode;
}

export function Link({ children, target = "", ...nextLinkProps }: LinkProps) {
  return (
    <NextLink.default {...nextLinkProps} passHref>
      <Anchor target={target}>{children}</Anchor>
    </NextLink.default>
  );
}
