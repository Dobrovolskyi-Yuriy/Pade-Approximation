const c = getRow('c', 2, [1, 1]);
const L = 1;
const M = 1;

console.log(padeApproximation(L, M, c));

function padeApproximation(L, M, baseRow) {
  const a = getRow('a', L + 1);
  const b = getRow('b', M + 1, [1]);

  const c2D = [];
  for (let i = 0; i < b.length; i++) {
    c2D.push([]);

    for (let j = 0; j < baseRow.length; j++) {
      if (i + j >= L + 1) {
        continue;
      }

      c2D[i].push(baseRow.coeffs[L - M + i + j + 1]);
    }
  }

  C2d = C2d.sort((a, b) => a - b);

  const C1d = C2d;

  const tmp = [...C2d];
  const colum = tmp.length;

  let x;
  let y;
  let value = 0;

  for (let diag = 0; diag < colum; diag++) // выполняем проход по диагоналям
    {
        if (diag % 2 == 0) // по четным диагоналям
        {
            x = 0; // х-координата первого лемента массива на диагонали - diag
            y = diag; // у-координата элемента массива на диагонали - diag
 
            while (y >= 0) // пока y-координата находится в верхней части диагонали
            {
                C2d[x][y] = tmp[value]; // записать значение в массив
                x++;     // по горизонтали, смещаемся влево
                y--;    // по вертикали, смещаемся вниз
            }
        }
        else // по нечетным диагоналям
        {
            x = diag; // х-координата элемента массива на диагонали - diag
            y = 0; // у-координата первого элемента массива на диагонали - diag
 
            while (x >= 0) // пока x-координата находится в левой части диагонали
            {
              C2d[x][y] = tmp[value]; // записать значение в массив
                x -= 1;  // по горизонтали, смещаемся вправо
                y +=  1; // по вертикали, смещаемся вверх
            }
        }
        value++;
    } // конец for
 
    // заполнение второй половины массива по диагонали, зигзагом, начиная
    // слева и сверху, заканчивая  последним элементом массива
    const start = Math.floor(tmp.length / 2);
    value -= 2;
    for (let diag = 1; diag < colum; diag++)
    {
        if (diag % 2 == 0) // по четным диагоналям
        {
            x = start; // х-координата первого элемента массива на диагонали - diag
            y = diag;  // у-координата элемента массива на диагонали - diag
 
            while (y <= start) // Пока не кончилась диагональ
            {
                C2d[x][y] = tmp[value];
                x--; // по горизонтали, смещаемся влево
                y++; // по вертикали, смещаемся вниз
            }
        }
        else // по не четным диагоналям
        {
            x = diag; // х-координата первого элемента к-ой диагонали
            y = start;  // у-координата первого элемента к-ой диагонали
 
            while (x <= start) // Пока не кончилась диагональ
            {
                C2d[x][y] = tmp[value];
                x++; // по горизонтали, смещаемся вправо
                y--; // по вертикали, смещаемся вверх
            }
        } // конец if-else
        value--;
    } // конец цикла for (заполнение второй половины массива)

    const determinate = Determinant(C2d);

    const BResults = [];

    for (let i = 0; i < determinate.length; i++) {
      BResults.push(-(C1d[i] / determinate[i]));
    }

    const AResults = [C1d[0]];

    for (let i = 1; i < L; i++) {
      const P = Math.min(L, M);

      let res;
      for (let j = 1; j < P; j++) {
        res = BResults[i] * C1d[L - j];
      }

      AResults.push(C1d[i] + res);
    }

    let ASum = 0;

    for (let i = 0; i < AResults.length; i++) {
      ASum += AResults[i];
    }

    let BSum = 0;

    for (let i = 0; i < BResults.length; i++) {
      BSum += BResults[i];
    }

    return (ASum / BSum).toFixed(10);


  function getNumeratorRow(L) {
    const res = ['a[0]*z^0'];

    for (let i = 1; i <= L; i++) {
      res.push(`a[${i}]*z^${i}`);
    }

    return res;
  }

  function getDenominatorRow(M) {
    const res = ['1*z^0'];

    for (let i = 1; i <= M; i++) {
      res.push(`b[${i}]*z^${i}`);
    }

    return res;
  }
}

function Determinant(A)   // Используется алгоритм Барейса, сложность O(n^3)
{
    var N = A.length, B = [], denom = 1, exchanges = 0;
    for (var i = 0; i < N; ++i)
     { B[ i ] = [];
       for (var j = 0; j < N; ++j) B[ i ][j] = A[ i ][j];
     }
    for (var i = 0; i < N-1; ++i)
     { var maxN = i, maxValue = Math.abs(B[ i ][ i ]);
       for (var j = i+1; j < N; ++j)
        { var value = Math.abs(B[j][ i ]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { var temp = B[ i ]; B[ i ] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       var value1 = B[ i ][ i ];
       for (var j = i+1; j < N; ++j)
        { var value2 = B[j][ i ];
          B[j][ i ] = 0;
          for (var k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[ i ][k]*value2)/denom;
        }
       denom = value1;
     }
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}

function getRow(base, length, coeffs = []) {
  return {
    base,
    length,
    coeffs,
  };
}
