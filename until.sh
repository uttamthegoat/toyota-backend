echo "Enter a number: "
read n

i=1
sum=0

# Calculation of the addition of the first 'n' natural numbers with the help of the 'until' loop.
until [ $i -gt $n ]
do           
  sum=$((sum + i))
  i=$((i + 1))
done

echo "The sum of First "$n "natural numbers is "$sum"."
