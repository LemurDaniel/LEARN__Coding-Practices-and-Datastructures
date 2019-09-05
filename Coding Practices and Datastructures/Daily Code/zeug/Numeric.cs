using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coding_Practices_and_Datastructures.Daily_Code.zeug
{
    public abstract class Numeric 
    {
        public Numeric Zero { get => GetZero(); }
        public Numeric One { get => GetOne(); }
        public Numeric MaxValue { get => GetMaxValue(); }
        public Numeric MinValue { get => GetMinValue(); }

        protected abstract Numeric GetZero();
        protected abstract Numeric GetOne();
        protected abstract Numeric GetMaxValue();
        protected abstract Numeric GetMinValue();

        public Object Val { get => Get(); set => Set(value); }

        public abstract Numeric Addi(Numeric z);
        public abstract Numeric Subi(Numeric z);
        public abstract Numeric Muli(Numeric z);
        public abstract Numeric Divi(Numeric z);
        public abstract Numeric Modi(Numeric z);
        public abstract Numeric Set(Object z);
        public abstract int Comp(Numeric z);
        public abstract Object Get();


        public override string ToString() => Val.ToString();
        public override bool Equals(object obj)
        {
            if (obj == this) return true;
            if (obj.GetType() != typeof(Numeric)) return false;
            return (obj as Numeric).Val.Equals(Val);
        }

        public override int GetHashCode() => 119980668 + EqualityComparer<object>.Default.GetHashCode(Val);
    }

    public abstract class Numeric<T> : Numeric where T : IComparable
    {
        protected T val;
        public override Numeric Set(Object val)
        {
            this.val = (T)val;
            return this;
        }
        public override Object Get() => val;
        public override Numeric Addi(Numeric z) => Set(Addi( ((Numeric<T>)z).val ));
        public override Numeric Divi(Numeric z) => Set(Divi(((Numeric<T>)z).val));
        public override Numeric Modi(Numeric z) => Set(Modi(((Numeric<T>)z).val));
        public override Numeric Muli(Numeric z) => Set(Muli(((Numeric<T>)z).val));
        public override Numeric Subi(Numeric z) => Set(Subi(((Numeric<T>)z).val));
        public override int Comp(Numeric z) => val.CompareTo(((Numeric<T>)z).val);

        protected abstract T Addi(T z);
        protected abstract T Divi(T z);
        protected abstract T Modi(T z);
        protected abstract T Muli(T z);
        protected abstract T Subi(T z);
    }

    public class NumericInt : Numeric<int>
    {
        public NumericInt(int val) => this.val = val;

        protected override int Addi(int z) => val + z;
        protected override int Divi(int z) => val /= z;
        protected override int Modi(int z) => val %= z;
        protected override int Muli(int z) => val *= z;
        protected override int Subi(int z) => val -= z;

        protected override Numeric GetMaxValue() => new NumericInt(int.MaxValue);
        protected override Numeric GetMinValue() => new NumericInt(int.MinValue);
        protected override Numeric GetOne() => new NumericInt(1);
        protected override Numeric GetZero() => new NumericInt(0);
    }
}
