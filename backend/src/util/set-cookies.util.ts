import { CookieOptions } from 'src/interface/cookie.inteface';
import { Response } from 'express';

export function setCookies(res: Response, cookies: CookieOptions[]) {
  cookies.forEach(({ name, value, maxAge, httpOnly = true }) => {
    res.cookie(name, value, {
      httpOnly,
      secure: true,
      maxAge,
      sameSite: 'strict',
    });
  });
}
