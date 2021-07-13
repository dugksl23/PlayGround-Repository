# Google-Java-Style-Guide


## made by 요한 김 <br>

---

## 1. 개요

이 문서는 Java 프로그래밍 언어의 소스 코드에 대한 Google Style로 규약된 코딩 스타일이다. 
Java 소스 파일은 여기에 있는 규칙을 준수하는 경우에만 Google style로 프로그래밍 된 것이라고 규정할 수 있다.

이외에도 코딩 규약은 여러 종류가 있습니다만, Java의 경우에는 Google의 코딩 규약을 많이 사용한다.


## 2. 소스 파일 기본 사항

 - 소스 파일 이름(확장자는 .java로 지정.)이 포함된 최상위 클래스의 <span style="color:red">대소문자 구별</span>을 통해 명명하며, 첫글자는 대문자로 한다.
 - 파일의 인코딩은 UTF-8로 인코딩 한다. ex) IJ
 
   ![image](https://user-images.githubusercontent.com/68539491/125384746-57c48180-e3d4-11eb-9d9a-931d501751e7.png)

 
 
 - 공백 문자는 소스 파일에서 아무 곳에서나 나타나는 유일한 공백 문자입니다. ex) 0x20(32): 스페이스 키(공백), 그러나 문자의 진수 0x00(0), NULL: 널 문자는 사용하지 않는다.
 - 코드 내에서 특수 문자를 사용할 때, 이스케이프 시퀀스를 사용한다. ex) \b, \t, \n, \f, \r, \", \', \ or \\ 등을 사용한다. 
 

## 3. 소스 파일의 구조

![스크린샷 2021-07-13 오전 11 04 54](https://user-images.githubusercontent.com/68539491/125378687-2b0b6c80-e3ca-11eb-8c25-8ee1f7a3fb34.png)


```
/*
 * Copyright (c) 1997, 2017, Oracle and/or its affiliates. All rights reserved.
 * ORACLE PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 */

package java.util;

import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.function.UnaryOperator;
import sun.misc.SharedSecrets;

public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
    private static final long serialVersionUID = 8683452581122892189L;

    ...
}

```


 - Package 문의 경우에는 되도록 한문장으로 써야 한다.
 - import 문에서 와일드 카드 ( * ) 는 사용하지 않는다.
 - import 문은 그룹핑을 통해 순서에 맞춰 작성한다. ex) static import -> google 내부 package import -> google 외부 package import -> java -> javax
 
   ![스크린샷 2021-07-13 오전 11 11 19](https://user-images.githubusercontent.com/68539491/125379194-0f549600-e3cb-11eb-8107-41af82a0a27b.png)
   
 - 하나의 소스 파일(.java)에는 하나의 class만 존재해야 하며, nested class는 존재해선 안 된다.
 - 클래스 내용의 순서 
    * 클래스 멤버의 순서는 절대적인 것이 없다. 다만, 이들의 순서가 논리적이여야 한다. ex) 새 메소드가 추가되었다고 하여, class의 가장 마지막에 구현되는 것은 논리적이지 않다.
    * class 생성자의 오버로딩을 통해 여러개가 존재할 경우, 이들은 순차적으로 작성되어야만 한다. 중간에 다른 멤버를 작성할 순 없다.
    
    
## 4. 포멧팅

 - **중괄호**

   Google Java coding conention은 K&R Style을 따르며, 제거가 가능해도 사용한다.
   K&R Style이란? Kernight and Ritchie Style의 역자로서 아래와 같은 규칙을 가진다.
   
   - 여는 괄호 앞에는 줄 바꿈이 없다.
   - 여는 괄호 뒤에는 줄 바꿈이 있다.
   - 닫는 괄호 앞에서 줄 바꿈이 있다.
   - 닫는 괄호 뒤에서 줄 바꿈이 있다.
   - 닫는 괄호 뒤에는 줄 바꿈이 있다.
   
   ```
    public class GoogleJavaConvention {
    
      public staic void main(String[] args) {
        
        int result = calcurator("+", 3, 4);
        
      }
    
    
       public static int calculator(String operator, int a, int b){
         
         if (operator == "+") {
           return sum(a, b);
         }
       
       }
    
       public static int sum (int a, int b){
       
         return a + b;
       
       }
    
    
    }
   
   ```

   ## 불가능한 예시

   ```
    public static void main(String[] args)
    
    
    public static int sum (int a, int b) {
      return a + b;
    }
    
    public static void main(String[] args){sum(3,4)} 
    
    
   ```
   
   ## 자주 사용하는 방식
   
   ```
    public static void main(String[] args)
    
    
    public static int sum (int a, int b) {
       return a + b;
    }
    
    public static int calculator(String[] args){
       
       if(operator == "+") return sum(3,4);
       else return -1;
       
    } 
    
   ```
   
  
 - **Line - Wrapping**
  
   - 각 구문은 하나의 줄 바꿈을 가진다. 
   - 하지만, 한 줄로 표현해야 하는 줄을 여러개의 줄로 나누었다고 했을 경우에는 줄바꿈을 해야 한다. 
     줄 바꿈을 모든 상황에서 적용할 수 있는 포괄적인 공식은 없다. 따라서 하나의 구문에는 줄 바꿈을 하는 여러가지 방식이 존재한다.
   - 메소드 또는 지역변수를 활용하여 코드의 라인을 줄일 수 있다.


   ```
   
 
    public static void main(String[] args) {

        int num = result();
    }


    public static int result() {
        Scanner sc = new Scanner(System.in);
        System.out.println("연산할 숫자를 입력해주세요. : a ");
        int a = sc.nextInt();

        System.out.println("연산할 숫자를 입력해주세요. : b ");
        int b = sc.nextInt();

        System.out.println("연산할 부호를 입력해주세요. : +, -, *, / ");
        String operator = sc.next();

        return calculator(operator, a, b);
    }

    public static int calculator(String operator, int a, int b) {
        if (operator == "+") return sum(3, 4);
        else return -1;
    }

    public static int sum(int a, int b) {
        return a + b;
    }
    
   ```
   
   
   
   
   

   




